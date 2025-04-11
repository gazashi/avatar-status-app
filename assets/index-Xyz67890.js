
document.getElementById("root").innerHTML = `
  <h1>アバターステータス管理（完全版）</h1>
  <div>集中力</div>
  <div class='stat-bar'><div class='stat-fill' style='width: 90%; background: white;'></div></div>
  <div>体力</div>
  <div class='stat-bar'><div class='stat-fill' style='width: 75%; background: red;'></div></div>
  <div>筋力</div>
  <div class='stat-bar'><div class='stat-fill' style='width: 65%; background: orange;'></div></div>
  <div style="margin-top:2rem;">
    <div style="display:inline-block;background:yellow;color:black;padding:4px;border:1px solid black;">ハッキング</div>
    <div style="display:inline-block;background:yellow;color:black;padding:4px;border:1px solid black;">作曲家</div>
    <div style="margin-top:1rem;"><button onclick="alert('追加')">特殊能力追加</button></div>
  </div>
`;
