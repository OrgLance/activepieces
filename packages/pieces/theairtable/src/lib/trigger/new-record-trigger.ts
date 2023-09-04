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
      personalToken: 'patXoeg57Hg6sUOCm.361c97a907ae81a69b375d8f94d46e27059f463bf0f203086f9c4ee89e027058',
      baseId: 'app3uZK9MUYs466jY',
      tableId: 'tblUE9OZHS0A1d8qZ',
      authentication: auth
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
    displayName: 'New Application',
    description: 'Triggers when a new application is received.',
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
