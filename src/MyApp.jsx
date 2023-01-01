import React , {Component} from "react";

import Node from './SingleNode.js'
import './css/MyApp.css'
import * as Constants from './constants'

import {depth_first_search} from './algorithms/dfs'

export default class MyApp extends Component{

    constructor(props){
        super(props)
        this.state = {
            nodes : []
        } 
    }

    componentDidMount() {
        const nodes = initialNodes();
        this.setState({nodes});
    }

    animate_dfs(visited_nodes){
        let  delay = 20;
        for(const node of visited_nodes){
            delay +=50;
            setTimeout(()=> {
            const newNodes = this.state.nodes.slice();
            const newNode = {
                ...node,
                visit : true
            }
            newNodes[node.row][node.col] = newNode;
            this.setState({nodes: newNodes});
            },10+delay);
        }
    }

    visualize_dfs() {
    const {nodes} = this.state;
    const startNode = nodes[Constants.start_row][Constants.start_col];
    const finishNode = nodes[Constants.end_row][Constants.end_col];
    const visitedNodesInOrder = depth_first_search(nodes, startNode, finishNode);
    visitedNodesInOrder.shift(); // Remove the starting element
    const last_ele = visitedNodesInOrder.pop();
    if(!(last_ele.col === Constants.end_col && last_ele.row === Constants.end_row)) {
        visitedNodesInOrder.push(last_ele);
    } 
    this.animate_dfs(visitedNodesInOrder);
    }



    handleMouseDown(row,col){
        const newNodes = getNewNodesWithWallToggle(this.state.nodes,row,col)
        this.setState({nodes : newNodes , mousePressed : true});
    }

    handleMouseUp(){
        this.setState({mousePressed : false});
    }

    handleMouseEnter(row,col){
        if(this.state.mousePressed===false)
        return;
        const newNodes = getNewNodesWithWallToggle(this.state.nodes,row,col)
        this.setState({nodes : newNodes});
    }

    render(){

        let nodes = this.state.nodes;
        return (
            <div>
            <button onClick={ () => this.visualize_dfs()}>DFS</button>
            <div className="mygrid">
            {nodes.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {start,finish,visit,isWall,row,col} = node;
                    return (
                      <Node 
                        key = {nodeIdx}
                        isStart = {start} 
                        isEnd = {finish}
                        isVisited = {visit}
                        isWall = {isWall}
                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                        onMouseUp={() => this.handleMouseUp()}
                        row = {row}
                        col = {col}
                        >
                      </Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
          </div>
        )
    }

}

const getNewNodesWithWallToggle = (nodes,row,col) => {
    const newNodes = nodes.slice();
    const node = newNodes[row][col];
    const newNode = {
        ...node,
        isWall : !node.isWall
    }
    newNodes[row][col] = newNode;
    return newNodes;
};

const initialNodes = () => {
    let nodes = []
    for(let row = 0; row < Constants.grid_height; row++){
        let crow = []; 
        for(let col = 0; col < Constants.grid_width; col++) {
            
            let thisNode = {
                row : row,
                col : col,
                start : row === Constants.start_row && col === Constants.start_col , 
                finish : row === Constants.end_row && col === Constants.end_col,
                visit : false,
                isWall : false
            };

            crow.push(thisNode);

        } 
        nodes.push(crow);
    }
    return nodes;
};