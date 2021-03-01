import React, { Component } from "react";
import {
  Row
} from "reactstrap";
import { injectIntl } from "react-intl";

import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../../helpers/IntlMessages";

class ForumHeading extends Component {
  render() {
    const {
      match,
      localeData,
    } = this.props;
    return (
      <Row>

        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id={localeData.heading} />
            </h1>
            <Breadcrumb match={match} />

          </div>

          <div className="mb-2">
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    );
  }
}

export default injectIntl(ForumHeading);