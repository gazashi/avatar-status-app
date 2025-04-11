
document.getElementById("root").innerHTML = `
  <h1 style="font-size:2rem;">アバターステータス管理</h1>
  <input type='file' />
  <h2>ステータス</h2>
  <div>体力</div>
  <div class='stat-bar'><div class='stat-fill' style='width:70%;background:#f80'></div></div>
  <h2>特殊能力</h2>
  <div style='background:yellow;border:1px solid black;padding:4px;'>ハッキング</div>
  <button onclick='alert("追加")'>追加</button>
`;
