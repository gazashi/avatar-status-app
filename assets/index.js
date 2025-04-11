
document.getElementById("root").innerHTML = `
  <h1>アバターステータス管理</h1>
  <p>UIがかっこよくなったバージョン</p>
  <div>
    <div>筋力</div>
    <div class='stat-bar'><div class='stat-fill' style='width: 60%; background: red;'></div></div>
    <div>稼ぐ力</div>
    <div class='stat-bar'><div class='stat-fill' style='width: 80%; background: yellow;'></div></div>
  </div>
  <div style="margin-top:2rem;">
    <button onclick="alert('特殊能力を追加')">特殊能力追加</button>
  </div>
`;
