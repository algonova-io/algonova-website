let spyLocked = false
export function lockSpy(ms = 700) {
    spyLocked = true
    // auto-unlock after scroll should be done
    setTimeout(() => { spyLocked = false }, ms)
}
export function isSpyLocked() { return spyLocked }