import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Form, Row, Col } from 'react-bootstrap';
import { postData } from '../Hook/Hook';

const Scan = (props) => {
    const { handleSubmit, formState } = useForm()
    const { isSubmitting } = formState
    const [freq, updateFreq] = useState();

    const handleOnScan = () => {
        return new Promise((resolve, reject) => {
            try {
                var re = new RegExp('^\\d{9}$')
                if (!re.test(freq)) {
                    throw new Error('Invalid frequency')
                } else {
                    postData('http://192.168.5.105:9000/scan', { 'freq': freq })
                        .then(data => props.parentCallback({
                            "freq": freq,
                            "chl": data["result"]
                        }))
                        .then(() => resolve())
                        .catch(err => {throw new Error(err.message)})
                }
            }
            catch (err) {
                alert(err.message)
                reject(err)
            }
        });
    }

    return (
        <form onSubmit={handleSubmit(handleOnScan)}>
            <Row className="form-rows" className="api-keys">
                <Col sm={6}>
                    <br />
                    <Form.Label className="form-label">Frequency : </Form.Label>
                    <Form.Control type="text" placeholder="123456789" onChange={(e) => updateFreq(parseInt(e.target.value))} />
                    <br />
                    <button disabled={isSubmitting} className="btn btn-primary mr-1">
                        {isSubmitting && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        Scan
                    </button>
                    <br />
                </Col>
            </Row>
        </form>
    )
}

export default Scan;