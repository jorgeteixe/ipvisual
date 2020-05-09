import React, { Component, Fragment } from 'react'
import { InputNumber } from 'antd'

export class InputIP extends Component {
    constructor(props) {
        super(props)
        this.inputs = [undefined, undefined, undefined, undefined]
    }

    changeHandler(v, n) {
        if (typeof v === 'number') {
            if (v < 256 && v >= 0) {
                this.props.changeHandler(v, n)
            } else if (v > 255) {
                this.props.changeHandler(255, n)
            } else {
                this.props.changeHandler(0, n)
            }
        } else {
            if (v !== '') {
                n !== 3
                    ? this.inputs[n + 1].focus()
                    : this.inputs[3].blur()
            }
        }
    }


    render() {
        return (
            <div className="input-ip">
                {this.props.ip.map((v, index) => {
                    return (
                        <Fragment key={index}>
                            <InputNumber ref={r => this.inputs[index] = r} size="large" min={0} max={255} value={v}
                                         onChange={(n) => this.changeHandler(n, index)}/>
                            {index === 3 ? '' : <b>.</b>}
                        </Fragment>
                    )
                })}
            </div>
        )
    }
}

export function IPToBinary(props) {

    const toBinaries = () => {
        return [
            Array.from((props.ip[0] >>> 0).toString(2).padStart(8, '0')),
            Array.from((props.ip[1] >>> 0).toString(2).padStart(8, '0')),
            Array.from((props.ip[2] >>> 0).toString(2).padStart(8, '0')),
            Array.from((props.ip[3] >>> 0).toString(2).padStart(8, '0'))
        ]
    }

    const handleClick = (i, j, octet) => {
        octet[j] = octet[j] === '0' ? '1' : '0'
        props.changeHandler(parseInt(octet.join(''), 2), i)
    }

    return (
        <div className="binary-display">
            {toBinaries().map((binary, i) => {
                return (
                    <div key={i}>
                        {binary.map((bit, j) => {
                            return <div key={j} onClick={() => handleClick(i, j, binary)}
                                        className={bit === '0' ? 'binary-zero' : 'binary-one'}/>
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export function IPToBinaryStatic(props) {

    const toBinaries = () => {
        return [
            Array.from((props.ip[0] >>> 0).toString(2).padStart(8, '0')),
            Array.from((props.ip[1] >>> 0).toString(2).padStart(8, '0')),
            Array.from((props.ip[2] >>> 0).toString(2).padStart(8, '0')),
            Array.from((props.ip[3] >>> 0).toString(2).padStart(8, '0'))
        ]
    }

    return (
        <div className="binary-display">
            {toBinaries().map((binary, i) => {
                return (
                    <div key={i}>
                        {binary.map((bit, j) => {
                            return <div key={j}
                                        className={'reset-cursor ' + (bit === '0' ? 'binary-zero' : 'binary-one')}/>
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export function BinaryWithLabel(props) {
    return (
        <Fragment>
            <h1 className="ip-label">{props.label}</h1>
            <IPToBinary ip={props.ip} changeHandler={props.changeHandler}/>
        </Fragment>
    )
}

export function StaticBinaryWithLabel(props) {
    return (
        <Fragment>
            <h1 className="ip-label">{props.label}</h1>
            <IPToBinaryStatic ip={props.ip}/>
        </Fragment>
    )
}
