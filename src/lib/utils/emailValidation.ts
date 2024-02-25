export function isValidEmail(email: string): boolean {
    return /^.{1,}@.{1,}\..{2,}$/g.test(email)
}