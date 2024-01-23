export const NewInterviewModal = () => (
  <>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
    <button
      className="btn btn-secondary"
      onClick={() =>
        (document.getElementById("my_modal_5") as any)?.showModal()
      }
    >
      Start Now
    </button>
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Give Unique Name for Interview!</h3>
        <br />
        <input
          type="text"
          placeholder="Any name"
          className="input w-full max-w-xs"
        />
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-secondary">Start Now</button>
          </form>
        </div>
      </div>
    </dialog>
  </>
);
