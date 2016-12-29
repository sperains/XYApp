
import React ,{Component} from 'react';
import './error404.scss';

// <div className="wrap">
// 	<div className="left">left</div>
// 	<div className="right">right</div>
// </div>


// <input type="file" onChange={this.onChange} />
// <img ref="image" style={{width: '750px' , height : '450px'}} src={this.state.imageUrl} />
// <canvas ref="canvas_1" className="canvas_1" style={{width : '450px' , height : '340px'}}></canvas>

export default class Error404 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			imageUrl : ''
		}
		this.onChange = this.onChange.bind(this);
		this.setImageUrl = this.setImageUrl.bind(this);
	}

	onChange(e){
		let me = this ;
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onload = function(){
			me.setImageUrl(reader.result);

			let canvas = me.refs.canvas_1;
			let ctx=canvas.getContext('2d');

			let image = me.refs.image;
			ctx.drawImage(image,0,0,300,200,0,0,300,200);
		}
		reader.readAsDataURL(file);

		
	}

	setImageUrl(url){
		this.setState({
			imageUrl : url 
		})
	}

	render() {
		return (
			<div>
				未找到页面~
			</div>
		)
	}
}