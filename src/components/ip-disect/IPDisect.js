import React, { Component, Fragment } from 'react'
import { Button, PageHeader } from 'antd'
import { BinaryWithLabel, InputIP } from '../reusable'
import './styles.css'

const BTN_RESET = 1
const BTN_RANDOM = 2
const BTN_NAVIGATE = 3

class IPDisect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ip: [127, 0, 0, 1]
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.titleHandlers = this.titleHandlers.bind(this)
    }

    changeHandler(v, n) {
        let newState = this.state.ip
        newState[n] = v
        this.setState({
            ip: newState
        })
    }

    titleHandlers(n) {
        // eslint-disable-next-line default-case
        switch (n) {
            case BTN_RESET:
                this.setState({
                    ip: [127, 0, 0, 1]
                })
                break
            case BTN_RANDOM:
                this.setState({
                    ip: [
                        Math.floor(Math.random() * 256),
                        Math.floor(Math.random() * 256),
                        Math.floor(Math.random() * 256),
                        Math.floor(Math.random() * 256)
                    ]
                })
                break
            case BTN_NAVIGATE:
                window.open(`http://${this.state.ip[0]}.${this.state.ip[1]}.${this.state.ip[2]}.${this.state.ip[3]}`, '_blank')
                break
        }
    }

    render() {
        return (
            <Fragment>
                <IPDisectTitle btnHandlers={this.titleHandlers}/>
                <InputIP changeHandler={this.changeHandler} ip={this.state.ip}/>
                <BinaryWithLabel label="Dirección IP" ip={this.state.ip} changeHandler={this.changeHandler}/>
            </Fragment>
        )
    }
}

function IPDisectTitle(props) {
    return (
        <PageHeader
            ghost={false}
            title="IP Básico"
            subTitle="Dada una dirección IP obtienes toda su información de forma visual."
            extra={[
                <Button key="3"
                        onClick={() => props.btnHandlers(BTN_NAVIGATE)}>Navegar a la IP</Button>,
                <Button key="2"
                        onClick={() => props.btnHandlers(BTN_RANDOM)}>Aleatoria</Button>,
                <Button key="1"
                        onClick={() => props.btnHandlers(BTN_RESET)} type="primary">Reset</Button>
            ]}
        />
    )
}


export default IPDisect
