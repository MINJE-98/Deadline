// 엑션 타입입니다.
const SELECTED_TEAM = 'SELECTED_TEAM'
const SELECTED_TEAM_INFO = 'SELECTED_TEAM_INFO'

const select_team = (selected_team) => ({ type: SELECTED_TEAM, selected_team: selected_team })

const selected_get_teaminfo = ()=>({
  type:SELECTED_TEAM_INFO
})
export {
  SELECTED_TEAM,
  SELECTED_TEAM_INFO,
  selected_get_teaminfo,
  select_team
}