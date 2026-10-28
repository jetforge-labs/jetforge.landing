// Recreation of the Checkmate window (dark tokens from Theme.swift). Decorative: the figure carries the label.
const GLYPHS = [
  { id: "search", d: <><circle cx="8.5" cy="8.5" r="5.5" /><path d="M12.6 12.6 17 17" /></> },
  { id: "tray", d: <><path d="M3 11.5 5 4.5h10l2 7v4H3z" /><path d="M3 11.5h4.2l.8 2h4l.8-2H17" /></> },
  { id: "cal", d: <><rect x="3" y="4.5" width="14" height="12.5" rx="2.5" /><path d="M3 8.5h14M7 2.8v3M13 2.8v3" /></> },
  { id: "up", d: <><rect x="3" y="4.5" width="14" height="12.5" rx="2.5" /><path d="M6.5 9.5h5M6.5 13h7M7 2.8v3M13 2.8v3" /></> },
  { id: "grid", d: <><rect x="3.5" y="3.5" width="5.5" height="5.5" rx="1.4" /><rect x="11" y="3.5" width="5.5" height="5.5" rx="1.4" /><rect x="3.5" y="11" width="5.5" height="5.5" rx="1.4" /><rect x="11" y="11" width="5.5" height="5.5" rx="1.4" /></> },
  { id: "done", d: <><circle cx="10" cy="10" r="7" /><path d="m6.8 10.2 2.2 2.2 4.3-4.6" /></> },
  { id: "rep", d: <><path d="M4 9a5 5 0 0 1 8.6-3.4L14.5 7.5M16 11a5 5 0 0 1-8.6 3.4L5.5 12.5" /><path d="M14.8 4v3.6h-3.6M5.2 16v-3.6h3.6" /></> },
  { id: "list", d: <><path d="M8 5.5h9M8 10h9M8 14.5h9" /><path d="m3 5.5 1.2 1.2L6 4.6M3 10l1.2 1.2L6 9.1" /><circle cx="4.4" cy="14.5" r="1" /></> },
  { id: "tag", d: <><path d="M3.5 3.5h6.2l7 7-6.2 6.2-7-7z" /><circle cx="7" cy="7" r="1.1" /></> },
];

function Glyph({ id, style }: { id: string; style?: React.CSSProperties }) {
  return (
    <svg style={style} aria-hidden="true">
      <use href={`#cm-i-${id}`} />
    </svg>
  );
}

const TEAL = "#68B5A9";
const BLUE = "#5C91FF";
const AMBER = "#D28D33";

export function CheckmateShot({ label }: { label: string }) {
  return (
    <div className="shot">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        {GLYPHS.map((g) => (
          <symbol key={g.id} id={`cm-i-${g.id}`} viewBox="0 0 20 20">{g.d}</symbol>
        ))}
      </svg>
      <div className="cm" role="img" aria-label={label}>
        <div className="cm-side" aria-hidden="true">
          <div className="lights"><i /><i /><i /></div>
          <div className="cm-add"><span className="dot">+</span>Add task</div>
          <div className="row"><Glyph id="search" />Search</div>
          <div className="row"><Glyph id="tray" />Inbox<span className="n">4</span></div>
          <div className="row on"><Glyph id="cal" />Today<span className="n">5</span></div>
          <div className="row"><Glyph id="up" />Upcoming</div>
          <div className="row"><Glyph id="grid" />Filters &amp; Labels</div>
          <div className="row"><Glyph id="done" />Completed</div>
          <div className="grp"><span>My Projects</span><span>+</span></div>
          <div className="row"><span className="hash" style={{ color: TEAL }}>#</span>Home<span className="n">6</span></div>
          <div className="row"><span className="hash" style={{ color: BLUE }}>#</span>Work<span className="n">9</span></div>
          <div className="row"><span className="hash" style={{ color: AMBER }}>#</span>Learn<span className="n">3</span></div>
        </div>
        <div className="cm-main" aria-hidden="true">
          <div className="cm-title">Today</div>
          <div className="gh">Overdue <span className="c">1</span><span className="act">Reschedule</span></div>
          <div className="t"><span className="ck" /><span className="tt">Book the dentist appointment</span>
            <span className="tm"><span className="late"><Glyph id="cal" />27 Oct</span></span><span className="tp">Inbox</span></div>
          <div className="gh gh2">28 Oct &nbsp;Today, Wednesday</div>
          <div className="t"><span className="ck p1" /><span className="tt">Call the plumber about the boiler</span>
            <span className="tm"><span className="today"><Glyph id="cal" />09:30</span></span><span className="tp">Home <span style={{ color: TEAL }}>#</span></span></div>
          <div className="t"><span className="ck p2" /><span className="tt">Send the October invoice</span>
            <span className="tm"><span className="today"><Glyph id="cal" /><Glyph id="rep" />16:00</span></span><span className="tp">Work <span style={{ color: BLUE }}>#</span></span></div>
          <div className="t"><span className="ck p3" /><span className="tt">Read chapter 4</span>
            <span className="tm"><span><Glyph id="list" />1/3</span></span><span className="tp">Learn <span style={{ color: AMBER }}>#</span></span></div>
          <div className="t"><span className="ck" /><span className="tt">Buy coffee beans</span>
            <span className="tm"><span><Glyph id="tag" style={{ color: TEAL }} />errands</span></span><span className="tp">Home <span style={{ color: TEAL }}>#</span></span></div>
          <div className="inl"><b>+</b>Add task</div>
          <div className="gh gh2">29 Oct &nbsp;Tomorrow, Thursday</div>
          <div className="t"><span className="ck" /><span className="tt">Renew the gym membership</span>
            <span className="tm"><span><Glyph id="cal" />Tomorrow</span></span><span className="tp">Home <span style={{ color: TEAL }}>#</span></span></div>
        </div>
      </div>
    </div>
  );
}
