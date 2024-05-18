const DaysOfWeek = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

const burnableImageUrl =
  PropertiesService.getScriptProperties().getProperty('burnableImageUrl');
const recyclableImageUrl =
  PropertiesService.getScriptProperties().getProperty('recyclableImageUrl');
if (!burnableImageUrl || !recyclableImageUrl) {
  throw new Error(
    'failed to get imageUrl from ScriptProperties! ending process...',
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notificationSettings = [
  {
    type: 'burnable',
    days: [DaysOfWeek.SUNDAY, DaysOfWeek.WEDNESDAY],
    messages: [
      {
        type: 'image',
        originalContentUrl: burnableImageUrl,
        previewImageUrl: burnableImageUrl,
      },
    ] satisfies Message[],
  },
  {
    type: 'recyclable',
    days: [DaysOfWeek.MONDAY],
    messages: [
      {
        type: 'image',
        originalContentUrl: recyclableImageUrl,
        previewImageUrl: recyclableImageUrl,
      },
    ] satisfies Message[],
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const commonTextMessages = [
  {
    type: 'text',
    text: '明日はごみの日です。\n※ごみ収集予定は祝日等の関係で変更になる場合があります。実際の交通規制に従って走行してください',
  },
] satisfies Message[];
