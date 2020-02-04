import React from 'react';
import Button from '../components/Button';

const Styleguide: React.FC = () => (
  <>
    <h1 role="title">Somatosensory Cortex Portal</h1>
    <section role="section">
      <h2>Buttons</h2>
      <p>Primary warm</p>
      <Button primary="warm" onClick={() => { console.log('click'); }}>warm</Button>
      <p>Primary cold</p>
      <Button primary="cool" onClick={() => { console.log('click'); }}>primary cool</Button>
      <p>Regular</p>
      <Button onClick={() => { console.log('click'); }}>good ol' button</Button>
      <p>Active</p>
      <Button active onClick={() => { console.log('click'); }}>I'm sooo active</Button>
      <p>With notifications</p>
      <Button notifications={7} onClick={() => { console.log('click'); }}>I'm sooo active</Button>
    </section>
    <section role="section">
      <h2>Initial</h2>
      <p>Warm</p>
      <p>Cold</p>
      <p>Background</p>
    </section>
    <section role="section">
      <h2>Content</h2>
      <p>Collapse</p>
      <p>Read more</p>
      <p>Modal</p>
    </section>
    <section role="section">
      <h2>Navigation</h2>
    </section>
  </>
);

export default Styleguide;