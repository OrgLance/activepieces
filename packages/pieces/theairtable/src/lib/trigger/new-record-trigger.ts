import { StaticPropsValue, TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { airtableCommon } from '../common';
import { DedupeStrategy, Polling, pollingHelper } from '@activepieces/pieces-common';
import { airtableAuth } from '../../';

const props = {
  // base: airtableCommon.base,
  // tableId: airtableCommon.tableId
}

const polling: Polling<string, StaticPropsValue<typeof props>> = {
  strategy: DedupeStrategy.TIMEBASED,
  items: async ({ auth, propsValue }) => {
    const records = await airtableCommon.getTableSnapshot({
      personalToken: 'patIMaTXTTuao1iEy.6aa7bef9353b51b15a7b275e65f11d810836d0c4375abf4cbddfcc6afd07a98e',
      baseId: 'apptjYHCIyUojCNgt',
      tableId: 'tblgwVeyM4aFiyCIE',
    });
    return records.map((record) => ({
      epochMilliSeconds: Date.parse(record.createdTime),
      data: record,
    }));
  }
}

export const airtableNewRecordTrigger = createTrigger({
  auth: airtableAuth,
    name: 'new_record',
    displayName: 'New Record',
    description: 'Triggers when a new record is added to the selected table.',
    props,
    sampleData: {},
    type: TriggerStrategy.POLLING,
    async test(context) {
      const { store, auth, propsValue } = context
      return await pollingHelper.test(polling, { store, auth, propsValue });
    },
    async onEnable(context) {
      const { store, auth, propsValue } = context
      await pollingHelper.onEnable(polling, { store, auth, propsValue });

    },

    async onDisable(context) {
      const { store, auth, propsValue } = context
      await pollingHelper.onDisable(polling, { store, auth, propsValue });
    },

    async run(context) {
      const { store, auth, propsValue } = context
      return await pollingHelper.poll(polling, { store, auth, propsValue });
    },
});
