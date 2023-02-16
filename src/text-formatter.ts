const SUFFIX = ":";
const PREFIX = "- ; ";

function isAlphaNumeric(charcode: number) {
	return (
		(charcode > 47 && charcode < 58) || // 0-9
		(charcode > 64 && charcode < 91) || // A-Z
		(charcode > 96 && charcode < 123)
	); // a-z
}

function isWhiteSpace(charcode: number) {
	return (
		charcode === 32 || // space
		charcode === 9
	); // tab
}

function firstAlphanumIndex(str: string) {
	for (let i = 0; i < str.length; i++) {
		if (isAlphaNumeric(str.charCodeAt(i))) return i;
	}
	return -1;
}

function firstNonWhitespaceIndex(str: string) {
	for (let i = 0; i < str.length; i++) {
		if (!isWhiteSpace(str.charCodeAt(i))) return i;
	}
	return -1;
}

function lastNonwhitespaceIndex(str: string) {
	for (let i = str.length - 1; i >= 0; i--) {
		if (!isWhiteSpace(str.charCodeAt(i))) return i;
	}
	return -1;
}

export function formatDefinition(line: string) {
	const firstAlphanum = firstAlphanumIndex(line);
	// if there is no alphanumeric characters, do nothing
	if (firstAlphanum === -1) return line;

  const firstNonwhitespaceIndex = firstNonWhitespaceIndex(line);
	const contentEnd = lastNonwhitespaceIndex(line);

  const prependingWhitespace = line.substring(0, firstNonwhitespaceIndex);

	let content = line.substring(firstNonwhitespaceIndex, contentEnd);
	// don't add prefix if it's already there
	if (content.startsWith(PREFIX))
		content = content.substring(PREFIX.length);

	const trailingWhitespace = line.substring(contentEnd + 1);

	// prepending whitespace + prefix + content + suffix + trailing whitespace
	const res = prependingWhitespace + PREFIX + "**" + content + "**" + SUFFIX + trailingWhitespace;
	return res;
}

console.log(formatDefinition("Cool beans bro!"));
