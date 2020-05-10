import React, { Component, Fragment } from 'react'
import { Button, Card, Descriptions, PageHeader, Typography, Tag } from 'antd'
import { BinaryWithLabel, InputIP } from '../reusable'
import './styles.css'
import { convertArrayToString, infoClassIp, isPrivate, isReserved, toBinary, toHex } from '../../utils/iputils'

const { Paragraph } = Typography

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
                <IPInfo ip={this.state.ip}/>
            </Fragment>
        )
    }
}

function IPDisectTitle(props) {
    return (
        <PageHeader
            ghost={false}
            title="IP Básico"
            subTitle="Dada una dirección IP obtienes su información."
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

function IPInfo(props) {

    const { ipClass, start, range, defaultMask } = infoClassIp(props.ip)

    return (
        <div className="ip-info">
            <Card title="Clase">
                <div className="ip-class">
                    <div>
                        <div>Clase<div>{ipClass}</div></div>
                        <div>Empieza por<div>{start}</div></div>
                    </div>
                    <div>
                        <div>Rango<div>{range}</div></div>
                        <div>Máscara<div>{defaultMask}</div></div>
                    </div>
                </div>
            </Card>
            <Card title="Otra información">
                <Descriptions bordered size="large">
                    <Descriptions.Item label="Privada">
                        {isPrivate(props.ip) ? <Tag color="green">Si</Tag> : <Tag color="red">No</Tag>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Reservada">
                        {isReserved(props.ip) ? <Tag color="green">Si</Tag> : <Tag color="red">No</Tag>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Binario">
                        <Paragraph className="description-to-copy" copyable>{toBinary(props.ip)}</Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item label="Decimal">
                        <Paragraph className="description-to-copy" copyable>{convertArrayToString(props.ip)}</Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item label="Hexadecimal">
                        <Paragraph className="description-to-copy" copyable>{toHex(props.ip)}</Paragraph>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    )
}

export default IPDisect
