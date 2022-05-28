let arr = [[], [], [], [], [], [], [], [], []]

for (let i = 0; i < 9; i++) {
	for (let j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


let board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.querySelector('#GetPuzzle')
let SolvePuzzle = document.querySelector('#SolvePuzzle')

GetPuzzle.onclick = async ()=> 
{
    let response = await fetch('https://sugoku.herokuapp.com/board?difficulty=hard')
    response = await response.json()
    board = response.board
	FillBoard(board)
}

SolvePuzzle.onclick = ()=>
{
	solver(board, 0, 0);
}

function isValid(board, row, col, c)
{
    for(let i = 0; i < 9; i++) 
    {
        if(board[i][col] == c)  //Each of the digits 1-9 must occur exactly once in each row.
            return false; 
        
        if(board[row][i] == c) //Each of the digits 1-9 must occur exactly once in each column.
            return false; 
       
        if(board[3 * parseInt((row / 3)) + parseInt(i / 3)][3 * parseInt(col / 3) + parseInt(i % 3)] == c) //Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
            return false; 
    }
    return true;
}    

function solver(board, i, j)
{
    if(i==9)
    {
        FillBoard(board);
        return true;
    }
    if(j==9)
    {
        return solver(board, i+1, 0);
    }
    if(board[i][j]!=0)
    {
        return solver(board, i, j+1);
    }
         
    for(let number=1; number<=9; number++)
    {
        if(isValid(board, i, j, number))
        {
            board[i][j]=number;
        
            let can_solve=solver(board, i, j+1);
            if(can_solve)
            {
                return true;
            }  
            board[i][j]=0;
        } 
        // board[i][j]=0;             
    }   
    // board[i][j]='.';
    return false;
}  

// void solveSudoku(vector<vector<char>>& board) 
// {
//     solve(board);
// }