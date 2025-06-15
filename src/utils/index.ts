export const wrapperMarkdown = (text: string): string => {
    const mdChars = new Set(['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']);
    let result = '';
    let i = 0;
    while (i < text.length) {
        const char = text[i];
        if (mdChars.has(char)) {
            if (i > 0 && text[i - 1] === '\\') {
                result += char;
            } else {
                result += '\\' + char;
            }
        } else {
            result += char;
        }
        i++;
    }
    return result;
}