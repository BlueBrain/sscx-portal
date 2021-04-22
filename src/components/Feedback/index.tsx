import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Select } from 'antd';
import { GatewayOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';

import { feedbackDeploymentId } from '../../config';
import pageLabelMap from './page-labels.json';

import styles from './styles.module.scss';


const { TextArea } = Input;
const { Option } = Select;

const FEEDBACK_CONTACT_KEY = 'feedbackContact';

const FEEDBACK_URL = `https://script.google.com/macros/s/${feedbackDeploymentId}/exec`;

const storage = typeof(window) !== 'undefined' ? window.sessionStorage : null;


const Feedback: React.FC = () => {
  const router = useRouter()

  const [formVisible, setFormVisible] = useState(false);
  const issueSelectRef = useRef(null);

  const [type, setType] = useState('');
  const [component, setComponent] = useState('');
  const [details, setDetails] = useState('');
  const [contact, setContact] = useState(storage?.getItem(FEEDBACK_CONTACT_KEY) ?? '');

  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);

  const onContactChange = (value: string) => {
    storage?.setItem(FEEDBACK_CONTACT_KEY, value);
    setContact(value);
  };

  const showForm = () => {
    setFormVisible(true);
    issueSelectRef?.current?.focus();
  };

  const closeForm = () => {
    setFormVisible(false);

    setTimeout(() => {
      setType('');
      setComponent('');
      setDetails('');

      setSendError(false);
      setSendSuccess(false);
    }, 200);
  }

  const sendFeedback = () => {
    setSendError(false);
    setSendSuccess(false);

    setSending(true);

    const feedback = { type, component, details, contact };
    const formData = new FormData();
    Object.entries(feedback).forEach(([key, val]) => formData.append(key, val));
    formData.append('page', pageLabelMap[router.pathname] ?? router.pathname);

    fetch(FEEDBACK_URL, {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        setSendSuccess(true);
        setTimeout(closeForm, 1000);
      })
      .catch(() => {
        setSendError(true);
      })
      .finally(() => {
        setSending(false);
      })
  };

  return (
    <div className={`${formVisible ? styles.formVisible : ''}`}>
      <div
        className={styles.feedbackButton}
        onClick={showForm}
      >
        Feedback
      </div>
      <div id="feedbackForm" className={styles.form}>
        <div className={styles.closeBtn}>
          <Button
            shape="circle"
            type="primary"
            danger
            icon={<CloseOutlined />}
            onClick={closeForm}
          />
        </div>
        <Form size="small" onSubmitCapture={sendFeedback}>
          <Form.Item>
            <Select
              placeholder="Feedback type (optional)"
              ref={issueSelectRef}
              disabled={sending}
              getPopupContainer={() => document.getElementById('feedbackForm')}
              value={type}
              onChange={(value) => setType(value as string)}
            >
              <Option value="content">Content</Option>
              <Option value="layout">Layout, UI</Option>
              <Option value="navigation">Navigation, UX</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Component / page section (optional)"
              prefix={<GatewayOutlined />}
              disabled={sending}
              value={component}
              onChange={e => setComponent(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <TextArea
              placeholder="Tell us about your experience..."
              rows={4}
              disabled={sending}
              autoSize={{minRows: 4, maxRows: 4}}
              value={details}
              onChange={e => setDetails(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Contact name / email (optional)"
              prefix={<UserOutlined />}
              disabled={sending}
              value={contact}
              onChange={e => onContactChange(e.target.value)}
              onPressEnter={sendFeedback}
            />
          </Form.Item>
          <Form.Item className="text-right mb-0">
            {sendSuccess && (
              <span className="mr-1">Sent, thank you!</span>
            )}
            {sendError && (
              <span className="mr-1 text-red">Oops, something went wrong</span>
            )}
            <Button
              className={styles.sendBtn}
              type="primary"
              danger
              disabled={!details || sendSuccess}
              loading={sending}
              onClick={sendFeedback}
            >
              {sending ? 'Sending': 'Send'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};


export default Feedback;
