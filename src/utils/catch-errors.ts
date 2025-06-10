type Result<T> = [T, null] | [null, Error]

export async function catchErrors<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const result = await promise
    return [result, null]
  } catch (error) {
    return [null, error]
  }
}
