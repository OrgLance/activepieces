import { PieceAuth, createPiece } from '@activepieces/pieces-framework';
import { airtableNewRecordTrigger } from './lib/trigger/new-record-trigger';

export const airtableAuth = PieceAuth.SecretText({
    displayName: 'Personal Token',
    required: true,
    description: `
    To obtain your personal token, follow these steps:

    1. Log in to your Airtable account.
    2. Visit https://airtable.com/create/tokens/ to create one
    3. Click on "+ Add a base" and select the base you want to use or all bases.
    4. Click on "+ Add a scope" and select "data.records.read" and "schema.bases.read".
    5. Click on "Create token" and copy the token.
    `,
})

export const airtable = createPiece({
    displayName: 'The Hiring-Box',
        minimumSupportedRelease: '0.5.0',
    logoUrl: 'https://softr-prod.imgix.net/applications/2b43eb44-6b57-40fd-9463-e4d661d2cf48/assets/7c8c868d-03aa-4fc0-a7d8-fac365367781.png',
    authors: ['Orglance-Technologies', 'Orglance'],
    auth: airtableAuth,
    actions: [],
    triggers: [airtableNewRecordTrigger],
})
