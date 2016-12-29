
import React , {Component } from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState} from 'draft-js';

export default class ImageCrop extends Component{

	constructor(props) {
		super(props);
		this.state = {editorState: EditorState.createEmpty()};
   		this.onChange = (editorState) => this.setState({editorState});
	}


	render() {
		 const {editorState} = this.state;
		return (
			<div>
				<Editor editorState={this.state.editorState} onChange={this.onChange} placeholder="Write something colorful...">
				</Editor>
				{/**/}
			</div>
		)
	}
}
