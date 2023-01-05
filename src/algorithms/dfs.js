import * as Constants from '../components/constants'
// might not return a shortest path 

var visited_in_order = [];
var glb_startNode = 0;
var glb_endNode = 0;
var glb_completed = false;



export function depth_first_search(grid , startNode , endNode) {
    visited_in_order = [];
    glb_endNode = endNode;
    glb_startNode = startNode;
    glb_completed = false;
    dfs(startNode.row,startNode.col,grid);
    return visited_in_order;
}

function issafe(x,y,grid){
    if(x<0 || y<0 || x>=Constants.grid_height || y>= Constants.grid_width)
    return false;

    if(grid[x][y].isWall===Infinity)
    return false;

    return true;
}

function dfs(r,c,grid){
    let nodeObj = {
        row : r,
        col : c 
    }
    visited_in_order.push(nodeObj);
    if(r===glb_endNode.row && c===glb_endNode.col){
        glb_completed = true;
        return;
    }
    const delx = [1,0,-1,0];
    const dely = [0,1,0,-1];

    for (let i=0; i<4; i++){
        let temp_obj = {
            row : r+delx[i],
            col : c+dely[i]
        }
        if( !glb_completed &&issafe(r+delx[i],c+dely[i],grid) ){
            if(!visited_in_order.some(el => el.row === r+delx[i] && el.col === c + dely[i]))
            dfs(r+delx[i],c+dely[i],grid)
        }
    }

}