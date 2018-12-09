import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// UI Imports
import { List, Icon, Row, Col } from 'antd';
import './DocumentList.css';

class DocumentList extends Component{
  render(){
    if(!this.props.documentList || this.props.documentList.length === 0){
      return null;
    }
    return(
      <List
        size="large"
        bordered
        dataSource={this.props.documentList}
        renderItem={item => (
          <List.Item
            className="list-item"
            >
            <Row type="flex" justify="start" align="middle" className="list-item-row">
              <Col
                xs={16} sm={20} md={22} lg={22} xl={22}
                className="list-item-col list-item-title"
                onClick={() => this.props.history.push(`/docs/${item._id}`)}
                >
                {item.title}
              </Col>
              <Col
                xs={4} sm={2} md={1} lg={1} xl={1}
                className="list-item-col"
                onClick={() => this.props.history.push(`/docs/${item._id}`)}
                >
                <Icon type="edit" />
              </Col>
              <Col
                xs={4} sm={2} md={1} lg={1} xl={1}
                className="list-item-col"
                onClick={() => this.props.deleteDocument(item._id)}
                >
                <Icon type="delete" />
              </Col>
            </Row>
          </List.Item>
        )}
      />
    );
  }
}

function mapStateToProps({ documentList }){
  return { documentList };
}

export default withRouter(connect(mapStateToProps) (DocumentList));