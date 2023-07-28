export abstract class Storage {
  public static getItem(key: string) {
    return localStorage.getItem(key)
  }

  public static getSessionItem(key: string) {
    return sessionStorage.getItem(key)
  }

  public static setItem(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  public static setSessionItem(key: string, value: string) {
    sessionStorage.setItem(key, value)
  }

  public static removeItem(key: string, value: string) {
    localStorage.removeItem(key)
  }

  public static removeSessionItem(key: string) {
    sessionStorage.removeItem(key)
  }

  public static clearStorage() {
    localStorage.clear()
  }

  public static clearSession() {
    sessionStorage.clear()
  }
}