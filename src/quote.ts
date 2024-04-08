// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getQuote(): Message {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRowIndex = sheet.getLastRow();
  const quoteAuthorPairs = sheet
    .getRange(`B2:C${lastRowIndex}`)
    .getDisplayValues()
    .filter(([quote]) => quote) as [string, string][];

  const [randomQuote, author] =
    quoteAuthorPairs[Math.floor(Math.random() * quoteAuthorPairs.length)];

  return {
    type: 'text',
    text: `今日の名言\n\"${randomQuote}\"${author ? `\n––${author}` : ''}`,
  };
}
