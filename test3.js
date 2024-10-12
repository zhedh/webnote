/**
 * @param {string} text
 * @param {string} pattern
 * @return {number}
 */
var maximumSubsequenceCount = function (text, pattern) {
  let count = 0

  function cumsum(num, sum) {
    if (num === 1) return sum + 1

    sum = sum + num
    return cumsum(num - 1, sum)
  }

  function calculate(arr) {
    
    let num = 0

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] !== pattern[0]) continue

      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] === pattern[1]) num++
      }
    }

    count = Math.max(count, num)
  }

  const arr = text.split('').filter((i) => i === pattern[0] || i === pattern[1])
  console.log(arr)

  if(arr.length===0) return 0
  if (arr.length === 1) return 1

  if (pattern[0] === pattern[1]) {
    return cumsum(arr.length, 0)
  }

  arr.push(pattern[1])
  calculate(arr)
  arr.pop()
  arr.unshift(pattern[0])
  calculate(arr)

  return count
}

// const text = 'aabb',
//   pattern = 'ab'

const text =
    'vnedkpkkyxelxqptfwuzcjhqmwagvrglkeivowvbjdoyydnjrqrqejoyptzoklaxcjxbrrfmpdxckfjzahparhpanwqfjrpbslsyiwbldnpjqishlsuagevjmiyktgofvnyncizswldwnngnkifmaxbmospdeslxirofgqouaapfgltgqxdhurxljcepdpndqqgfwkfiqrwuwxfamciyweehktaegynfumwnhrgrhcluenpnoieqdivznrjljcotysnlylyswvdlkgsvrotavnkifwmnvgagjykxgwaimavqsxuitknmbxppgzfwtjdvegapcplreokicxcsbdrsyfpustpxxssnouifkypwqrywprjlyddrggkcglbgcrbihgpxxosmejchmzkydhquevpschkpyulqxgduqkqgwnsowxrmgqbmltrltzqmmpjilpfxocflpkwithsjlljxdygfvstvwqsyxlkknmgpppupgjvfgmxnwmvrfuwcrsadomyddazlonjyjdeswwznkaeaasyvurpgyvjsiltiykwquesfjmuswjlrphsdthmuqkrhynmqnfqdlwnwesdmiiqvcpingbcgcsvqmsmskesrajqwmgtdoktreqssutpudfykriqhblntfabspbeddpdkownehqszbmddizdgtqmobirwbopmoqzwydnpqnvkwadajbecmajilzkfwjnpfyamudpppuxhlcngkign',
  pattern = 'rr'

console.log(maximumSubsequenceCount(text, pattern))


class Plugin {
  config = {}

  constructor(config) {
    this.config = config
  }

  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('webpack 构建正在启动！')
      console.log(this.config)
    })
  }
}