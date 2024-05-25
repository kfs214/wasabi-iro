// eslint-disable-next-line @typescript-eslint/no-unused-vars
function main() {
  const todaysSettings = notificationSettings
    .filter((setting) => setting.days.includes(new Date().getDay()))
    .flatMap((setting) => setting.messages);
  if (todaysSettings.length === 0) {
    Logger.log('No notification settings found for today.');
    return;
  }

  const lineChannelAccessToken =
    PropertiesService.getScriptProperties().getProperty(
      'lineChannelAccessToken',
    );
  if (!lineChannelAccessToken) {
    throw new Error(
      'failed to get lineChannelAccessToken from ScriptProperties! ending process...',
    );
  }

  const lineGroupId =
    PropertiesService.getScriptProperties().getProperty('lineGroupId');
  if (!lineGroupId) {
    throw new Error(
      'failed to get lineGroupId from ScriptProperties! ending process...',
    );
  }

  const lineApiOrigin =
    PropertiesService.getScriptProperties().getProperty('lineApiOrigin');
  if (!lineApiOrigin) {
    throw new Error(
      'failed to get lineApiOrigin from ScriptProperties! ending process...',
    );
  }

  const quote = getQuote();

  const lineClient = line({
    channelAccessToken: lineChannelAccessToken,
    apiOrigin: lineApiOrigin,
  });

  lineClient.push({
    to: lineGroupId,
    messages: [quote, ...todaysSettings, ...commonTextMessages].filter(
      (e) => e,
    ),
  });
}
