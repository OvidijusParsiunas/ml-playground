import { CSV } from '../../shared/types/CSV';

export class ParseCSVClipboardText {
  private static preprocessText(multiLineString: string): string {
    let newString = multiLineString;
    if (multiLineString.charAt(0) === '"') {
      newString = newString.substring(1);
    }
    if (multiLineString.charAt(multiLineString.length - 1) === '"') {
      newString = newString.substring(0, multiLineString.length - 2);
    }
    return newString;
  }

  private static getSeparatorSymbols(multiLineString: string): { newLine: string; tab: string } {
    // occurs when pasting string that contains actual \n or \t symbols
    if (multiLineString.indexOf('\\\\n') > -1 || multiLineString.indexOf('\\\\t') > -1) {
      return { newLine: '\\\\n', tab: '\\\\t' };
    }
    return { newLine: '\\n', tab: '\\t' };
  }

  public static parse(multiLineString: string): CSV {
    const processedText = ParseCSVClipboardText.preprocessText(multiLineString);
    const { newLine, tab } = ParseCSVClipboardText.getSeparatorSymbols(processedText);
    const linesOfText: string[] = processedText.split(newLine);
    return linesOfText.map((lineOfText: string) => {
      // row indexes in worksheets end with \\t\\t\\t\\t\\t
      return lineOfText.split(tab).filter((cellText) => cellText !== '');
    });
  }
}
