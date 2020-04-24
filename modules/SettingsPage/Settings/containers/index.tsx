import React from 'react'
import { Row, Col } from 'antd'
import { PasswordSetContainer } from '~/modules/PasswordSetPage'
import EmailChangeContainer from './EmailChangeContainer'

const SettingsContainer = () => {
    return (
        <Row>
            <Col md={12}>
                <PasswordSetContainer />
            </Col>
            <Col md={12}>
                <EmailChangeContainer />
            </Col>
        </Row>
    )
}

export default SettingsContainer
