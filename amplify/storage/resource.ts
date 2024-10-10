import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'invoiceStorage',
    access: (allow) => ({
      'invoices/{entity_id}/*': [
        allow.entity('identity').to(['write', 'read', 'delete']),
      ],
    }),
  });