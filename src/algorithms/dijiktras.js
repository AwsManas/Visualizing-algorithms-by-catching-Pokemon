import * as Constants from '../constants'

var visited_in_order = [];
var shortestPath = []
var n;
var m;

function issafe(x,y,grid){
  if(x<0 || y<0 || x>=Constants.grid_height || y>= Constants.grid_width)
  return false;

  if(grid[x][y].isWall===Infinity)
  return false;

  return true;
}


function minDist(dist,vis){
  let minn = Infinity;
  let row = -1, col = -1;
  for(let i=0; i<n; i++){
    for(let j=0; j<m; j++){
      if(vis[i][j]===false && dist[i][j]< minn){
        minn = dist[i][j];
        row = i;
        col = j;
      }
    }
  }
  let node = {
    row : row,
    col : col
  };

  return node;
}

export function dijiktras_path(grid, startNode, finishNode) {
  visited_in_order = [];
  shortestPath = []
  n = grid.length;
  m = grid[0].length;
  var dist = new Array(n).fill(null).map(()=>new Array(m).fill(Infinity));
  var parents = new Array(n).fill(null).map(()=>new Array(m).fill(-1));
  var isSmallest = new Array(n).fill(null).map(()=>new Array(m).fill(false));
  dist[startNode.row][startNode.col] = 0;
  const delx = [1,0,-1,0];
  const dely = [0,1,0,-1];

  for(let ii=0; ii<n*m; ii++){
    let u = minDist(dist,isSmallest);
    if(u.row===-1 && u.col === -1) continue;
    visited_in_order.push(u);
    if(u.row===finishNode.row && u.col === finishNode.col) break;
    isSmallest[u.row][u.col] = true;
    let r = u.row,c = u.col;
    for (let i=0; i<4; i++){
      let temp_obj = {
          row : r+delx[i],
          col : c+dely[i]
      };

      if(issafe(r+delx[i],c+dely[i],grid) ){
        //let offset = isNaN(grid[r+delx[i]][c +dely[i]].weight) ? 1 : grid[r+delx[i]][c +dely[i]].weight;
        let offset = grid[r+delx[i]][c +dely[i]].isWall;
        offset = offset === 0 ? 1 : offset;
        if(isSmallest[r+delx[i]][c+dely[i]] === false && dist[r][c]!== Infinity && dist[r][c] + offset < dist[r+delx[i]][c+dely[i]]){
          dist[r+delx[i]][c+dely[i]] = dist[r][c] + offset;
          parents[r+delx[i]][c+dely[i]] = u;
        }
    }
    }
    
  }

  const last_ele  = visited_in_order[visited_in_order.length-1];
    if(last_ele.row === finishNode.row && last_ele.col === finishNode.col && dist[finishNode.row][finishNode.col]!= Infinity) {
        // a sucessfull path exists 
        var temp_node = JSON.parse(JSON.stringify(last_ele))
        while(temp_node.col!== startNode.col || temp_node.row !== startNode.row){
            shortestPath.push(temp_node);
            temp_node = parents[temp_node.row][temp_node.col]
        }
        shortestPath.push(temp_node);
    }
    shortestPath.reverse();
    return [visited_in_order , shortestPath];


}