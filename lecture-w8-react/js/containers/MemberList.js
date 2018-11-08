import React from "react";
import {connect} from "react-redux";
import es6BindAll from "es6bindall";

class MemberList extends React.Component{

  constructor() {
    super();
    this.state = {
      members: [],
      entity: {empNo: "", name: ""},
      newEntity: {id: "", empNo: "", name: ""},
      showEdit: false
    };
    es6BindAll(this, ['handleChange', 'handleSubmit', 'toggleEdit', 'handleUpdate', 'handleEditChange', 'handleRemove']);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.members !== this.props.members) {
      this.setState({members: nextProps.members});
    }
    //檢查是否有抓到訊息
    if (!!nextProps.message) {
      alert(nextProps.message);
    }

  }

  handleChange(e) {
    this.setState({entity: {...this.state.entity, [e.target.name]: e.target.value}})
  }

  handleEditChange(e) {
    this.setState({newEntity: {...this.state.newEntity, [e.target.name]: e.target.value}})
  }

  handleSubmit() {
  }

  toggleEdit(show, member = this.state.newEntity) {
    this.setState({newEntity: member, showEdit: show});
  }

  handleUpdate() {
  }

  handleRemove(member) {
  }

  render() {
    const members = this.state.members.map(m => {
        return (
            this.state.showEdit && this.state.newEntity.id === m.id ?
              <tr key={m.id}>
                <td><input type="text" name="empNo" value={this.state.newEntity.empNo} onChange={this.handleEditChange} /></td>
                <td><input type="text" name="name" value={this.state.newEntity.name} onChange={this.handleEditChange} /></td>
                <td><input type="button" value="儲存" onClick={this.handleUpdate} /></td>
              </tr> :
              <tr key={m.id}>
                <td>{m.empNo}</td>
                <td>{m.name}</td>
                <td><input type="button" value="編輯" onClick={() => this.toggleEdit(true, m)} /></td>
                <td><input type="button" value="刪除" onClick={() => this.handleRemove(m)} /></td>
              </tr>
        );
      }
    );

    return(
      <>
        <table className="table">
          <thead>
            <tr>
              <th className="col-md-2">EMP_NO</th>
              <th className="col-md-2">NAME</th>
            </tr>
          </thead>
          <tbody>
            {members}
          </tbody>
        </table>
        <br/>
        EmpNo: <input type="text" name="empNo" value={this.state.entity.empNo} onChange={this.handleChange} />
        Name: <input type="text" name="name" value={this.state.entity.name} onChange={this.handleChange} /> <br/>
        <input type="button" defaultValue="新增" onClick={this.handleSubmit} />
      </>
    );
  }
}

const mapStatusToProps = (status) => {
  return {
  }
};

export default connect(mapStatusToProps)(MemberList);