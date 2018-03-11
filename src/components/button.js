import * as React from "react"

const colorsMap = {
    enter: "#eee",
    down: "#ccc"
};

export class Button extends React.Component {
    state = {};

    mouseEnter = () => {
        this.setState({
            mouse: "enter"
        })
    };

    mouseLeave = () => {
        this.setState({
            mouse: null
        })
    };

    mouseDown = () => {
        this.setState({
            mouse: "down"
        })
    };

    mouseUp = () => {
        this.setState({
            mouse: "enter"
        })
    };

    handleClick = () => {
        const {onClick} = this.props;
        onClick()
    };

    render() {
        const {title} = this.props;
        const {mouse} = this.state;
        return <div onClick={this.handleClick} onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseLeave={this.mouseLeave}
                    onMouseEnter={this.mouseEnter} className="flexbox-column" style={{
            padding: 8,
            border: "1px solid #000",
            cursor: "pointer",
            backgroundColor: colorsMap[mouse]
        }}>{title}</div>
    }
}