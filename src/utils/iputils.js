import * as iputils from 'ip-utils'

export const isPrivate = ip => {
    return iputils.ip(convertArrayToString(ip)).isPrivate()
}

export const isReserved = ip => {
    return iputils.ip(convertArrayToString(ip)).isReserved()
}

export const convertArrayToString = ip => {
    return `${ip[0]}.${ip[1]}.${ip[2]}.${ip[3]}`
}

export const toBinary = ip => {
    return (ip[0] >>> 0).toString(2).padStart(8, '0') + ' ' +
        (ip[1] >>> 0).toString(2).padStart(8, '0') + ' ' +
        (ip[2] >>> 0).toString(2).padStart(8, '0') + ' ' +
        (ip[3] >>> 0).toString(2).padStart(8, '0')
}

export const toHex = ip => {
    return (ip[0] >>> 0).toString(16).padStart(2, '0') + ' ' +
        (ip[1] >>> 0).toString(16).padStart(2, '0') + ' ' +
        (ip[2] >>> 0).toString(16).padStart(2, '0') + ' ' +
        (ip[3] >>> 0).toString(16).padStart(2, '0')
}

export const infoClassIp = ip => {

    let range = ranges.indexOf(ranges.find(b => {
        return ip[0] >= b[0] && ip[0] <= b[1]
    }))

    let start = (ip[0] >>> 0).toString(2).padStart(8, '0').slice(0, range + 1 < 5 ? range + 1 : range)

    return {
        ipClass: classes[range],
        start: start,
        range: ranges[range][0] + ' - ' + ranges[range][1],
        defaultMask: defaultMasks[range] || '-'
    }
}

const ranges = [
    [0, 127],
    [128, 191],
    [192, 223],
    [224, 239],
    [240, 255]
]

const classes = ['A', 'B', 'C', 'D', 'E']

const defaultMasks = ['255.0.0.0', '255.255.0.0', '255.255.255.0']
