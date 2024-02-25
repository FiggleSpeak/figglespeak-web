const API_ENDPOINT = 'https://figglespeak-api-b4xmvx4tla-uc.a.run.app/evaluate_user'

export default {
  async correctSpeech(audioBlob: Blob, sentence: string): Promise<[number[][], string[][]]> {
    const formData = new FormData()
    formData.append('sentence', sentence)
    formData.append('audio', audioBlob)

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData
    })
    const data = await response.json()

    // for (let i = 0; i < data.length; i++) {
    //   const diff = sentence.split(' ').length - data[i].length
    //   if (diff > 0) {
    //     for (let j = 0; j < diff; j++) {
    //       data[i].push(0)
    //     }
    //   }
    // }
    return data
  }
}
