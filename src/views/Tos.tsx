import React from 'react';
import Link from 'next/link';

import Title from '../components/Title';
import FullPage from '../layouts/FullPage';
import { Color } from '../types';

import styles from './tos.module.scss';


const colorName: Color = 'lavender';

const TermsOfUse: React.FC = () => {
  return (
    <FullPage>
      <div className={styles.container}>
        <Title title="Terms of use" primaryColor={colorName} />

        <p>
          Welcome to the BBP SomatoSensoryCortex (SSCx) portal.
        </p>

        <p>
          Here BBP provides you SSCx data (collectively and as further described, the "Data"),
          which includes quantitative information or qualitative statements collected,
          owned by or licensed to BBP in the course of its scientific work by experimentation,
          observation, modelling, interview or other methods, or information derived from existing evidence.
          Data may be raw or primary (e.g. direct from measurement or collection) or
          derived from primary data for subsequent analysis or interpretation (e.g. cleaned up or
          as an extract from a larger data set), or derived from existing sources where
          the rights may be held by others. Data files are in the process of continuous change and/or development.
          Files containing this Data are accessed, amended and/or updated as new data is gathered and/or processed.
          Some datasets may never be ‘finished’.
        </p>

        <p>
          By accessing, downloading and using the Portal and the Data, you agree to these terms of use.
          If you do not agree with any of these Terms, please do not use the Portal.
          We may change the Terms at any time without prior notice, and your continued use of any of the Sites
          following any changes is an agreement by you to the change in Terms.
          We may change, suspend, discontinue, or remove any part of the Portal at any time, without prior notice,
          including the availability of any feature, services or content.
        </p>

        <p>
          Unless otherwise stated, BBP owns or has a license to all the Data on this Portal.
          Except for the limited permissions expressly stated in these Terms or
          in the licence terms adhering to the Data, all rights not specifically granted are reserved.
        </p>

        <h3>DATA LICENCE</h3>

        <p>
          You may use, copy, distribute, publicly perform, publicly display or create derivative works of Data
          for research or other noncommercial purposes, provided that Data are appropriately referenced
          (pursuant to the Citation section below).
        </p>

        <p>
          Use of Data for research and academic publication, in scholarly journal, textbook or other professional,
          academic or journalist publications (with appropriate citation) is not considered commercial use.
        </p>

        <p>
          Data may not be used directly or indirectly by you for illegal, and military activities.
        </p>

        <p>
          To request permission for commercial purposes, please <Link href="/contact">contact us</Link>.
        </p>

        <p>
          You can develop new methods, applications, interfaces or other inventions or works that improve the use of,
          and build upon, the Data. If you develop an improvement based on or utilising the Data,
          and you obtain any proprietary rights in or to that improvement, you and your successors or assigns
          agree that you will not assert any claim for infringement against the BBP for our use of any improvement
          that was independently developed by or on behalf of the BBP. Additionally, BBP retains our rights,
          title and interest in any Data that is part of or is used by you to create an improvement.
        </p>

        <p>
          You may not post Data on social media or other third-party websites that require you
          to acknowledge that you own the Data you post. You may not create hyperlinks to the Portal
          that portray the BBP in a false or misleading light (for example politicals and political parties,
          pharmaceutical companies, alternative therapies, military activities and references thereof).
        </p>

        <p>
          For some Data you find in the Portal, BBP may be bound by its contractual and license agreements
          respecting certain third-party resources. For the Data to whom BBP has a licence,
          you have to adhere to any license terms and conditions provided with these resources.
        </p>
      </div>
    </FullPage>
  );
};


export default TermsOfUse;
