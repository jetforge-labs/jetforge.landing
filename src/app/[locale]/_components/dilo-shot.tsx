import Image from "next/image";

// Recreation of Dilo dictating into a mail window (final state of the getdilo.co hero demo).
export function DiloShot({ label }: { label: string }) {
  return (
    <div className="shot">
      <div className="dl" role="img" aria-label={label}>
        <div className="dl-bar" aria-hidden="true">
          <div className="apps"><span>File</span><span>Edit</span><span>View</span><span>Message</span></div>
          <div className="st">
            <Image src="/apps/dilo-glyph.svg" alt="" width={20} height={20} />
            <span>Wed 28 Oct 10:42</span>
          </div>
        </div>
        <div className="dl-win" aria-hidden="true">
          <div className="dl-wbar"><span className="lights"><i /><i /><i /></span>New message</div>
          <div className="fld"><span>To:</span>Emma Walker</div>
          <div className="fld"><span>Subject:</span>Wednesday meeting</div>
          <div className="body">
            Hi Emma,<br />
            <span className="pasted">Let&rsquo;s meet Wednesday at ten and bring the revised budget.</span>
            <span className="caret" />
          </div>
        </div>
        <div className="hud" aria-hidden="true">
          <div className="meta2">
            <span className="wave"><i /><i /><i /><i /><i /></span>
          </div>
          <div>
            <span className="lbl">Cleaning up <span className="pro">Pro</span></span>
            <p className="raw">
              <s>um,</s> let&rsquo;s meet <s>Tuesday, no,</s> Wednesday at ten and, <s>well,</s> bring the revised budget
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
