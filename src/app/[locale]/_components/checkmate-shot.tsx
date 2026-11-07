// Recreations of Checkmate on the Mac (dark tokens from Theme.swift) and on iPhone, Today view.
// The text inside is the recreated app's own UI: decorative, hidden from assistive tech. The wrapper carries the label.
export function CheckmateShot({ label }: { label: string }) {
  return (
    <div className="shot">
      <div className="cm" role="img" aria-label={label}>
        <div className="cm-side" aria-hidden="true">
          <div className="lights"><i /><i /><i /></div>
          <div className="cm-add"><span className="dot">+</span>Add task</div>
          <div className="cm-row"><span className="ic" />Inbox<span className="n">4</span></div>
          <div className="cm-row on"><span className="ic" />Today<span className="n">5</span></div>
          <div className="cm-row"><span className="ic" />Upcoming</div>
          <div className="cm-row"><span className="ic" />Filters &amp; Labels</div>
          <div className="cm-grp"><span>My Projects</span><span>+</span></div>
          <div className="cm-row"><span className="hash" style={{ color: "#68B5A9" }}>#</span>Home<span className="n">6</span></div>
          <div className="cm-row"><span className="hash" style={{ color: "#5C91FF" }}>#</span>Work<span className="n">9</span></div>
          <div className="cm-row"><span className="hash" style={{ color: "#D28D33" }}>#</span>Learn<span className="n">3</span></div>
        </div>
        <div className="cm-main" aria-hidden="true">
          <div className="cm-title">Today</div>
          <div className="gh">Overdue<span className="act">Reschedule</span></div>
          <div className="t"><span className="ck" /><span>Book the dentist appointment</span><span className="tm"><span className="late">27 Oct</span></span><span className="tp">Inbox</span></div>
          <div className="gh gh2">28 Oct &middot; Today, Wednesday</div>
          <div className="t"><span className="ck p1" /><span>Call the plumber about the boiler</span><span className="tm"><span className="today">09:30</span></span><span className="tp">Home</span></div>
          <div className="t"><span className="ck p2" /><span>Send the October invoice</span><span className="tm"><span className="today">16:00 &middot; every month</span></span><span className="tp">Work</span></div>
          <div className="t"><span className="ck p3" /><span>Read chapter 4</span><span className="tm"><span>1/3 subtasks</span></span><span className="tp">Learn</span></div>
          <div className="t"><span className="ck" /><span>Buy coffee beans</span><span className="tm"><span>@errands</span></span><span className="tp">Home</span></div>
        </div>
      </div>
    </div>
  );
}

export function IphoneShot({ label }: { label: string }) {
  return (
    <div className="shot phone">
      <div className="ph" role="img" aria-label={label}>
        <div aria-hidden="true">
          <div className="island" />
          <h6>Today</h6>
          <ul>
            <li><span className="ck p1" /><span>Call the plumber<small>09:30 &middot; Home</small></span></li>
            <li><span className="ck p2" /><span>Send the October invoice<small>16:00 &middot; Work</small></span></li>
            <li><span className="ck p3" /><span>Read chapter 4<small>Learn</small></span></li>
            <li><span className="ck" /><span>Buy coffee beans<small>Home</small></span></li>
          </ul>
          <span className="fab">+</span>
          <span className="sync">Synced with your Mac through iCloud</span>
        </div>
      </div>
    </div>
  );
}
