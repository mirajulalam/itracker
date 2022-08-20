import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";


// type user = {
//   displayName?: string;
//   photoURL?: string;
//   phone?: number;
//   github?: string;
//   facebook?: string;
//   email?: string;
//   address?: string;
//   city?: string;
//   linkedin?: string;
//   twitter?: string;
// }
// http://localhost:5000/updateProfile/${email}
// `http://localhost:5000/userInfo/${email}`

const ViewProfile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit } = useForm();

  if (loading) {
    return <Loading />;
  }
  if (user) {
    const email = user.email;
    fetch(`http://localhost:5000/userInfo/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }

  const handleEdit = () => {
    setIsEdit(true);
  };

  const onSubmit = (data) => {
    console.log(data)
    const email = user?.email;
    // send user Info to database
    if (email !== null) {
      fetch(`http://localhost:5000/updateProfile/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // e.target.reset();
          swal("Update Your Profile", `Successfully`, "success");
          setIsEdit(false);
        });
    }
  }
    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className=" mt-5 bg-base-200 flex-col flex items-center py-11"
      >
        <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-3/4 lg:w-2/3 justify-center items-center">
          <div className="flex items-center bg-slate-200 w-full">
            <div className="avatar p-5 pr-0 w-1/4">
              <div className=" w-36 mask mask-hexagon">
                <img src={userInfo?.photoURL} alt={userInfo?.displayName} />
              </div>
     
            </div>
            {/* Name Section  */}
            <div>
              <h1 className="text-4xl font-bold">{userInfo?.displayName}</h1>
              <p>{userInfo?.email}</p>
            </div>
          </div>

          {/* Aditional Info  */}

        

          <div className="w-full flex flex-row">
              <div className=" px-5 lg:px-10 w-1/6 lg:w-2/12 py-5">
                <div className="font-bold">Name</div>
              </div>
            
            </div>

          <div className="w-full flex flex-row">
              <div className=" px-5 lg:px-10 w-1/6 lg:w-2/12 py-5">
                <div className="font-bold">Name</div>
              </div>
              <div className=" px-10 py-5 w-5/6 lg:w-10/12">
                {isEdit ? (
                  <input
                    type="text"
                    className="input input-bordered input-secondary w-full"
                    defaultValue={userInfo?.name}
                    {...register("name", { maxLength: 20 })}
                  />
                ) : (
                  <div>{userInfo?.name}</div>
                
                )}
              </div>
            </div>

          <div className="overflow-x-auto w-full">
            {/* <!-- row 1 --> */}
            <div className="w-full flex flex-row">
              <div className=" px-5 lg:px-10 w-1/6 lg:w-2/12 py-5">
                <div className="font-bold">Address</div>
                <div className="text-sm opacity-50">City</div>
              </div>
              <div className=" px-10 py-5 w-5/6 lg:w-10/12">
                {isEdit ? (
                  <input
                    className="input input-bordered input-secondary w-full"
                    // name="address"
                    defaultValue={userInfo?.address}
                    {...register("address", {
                      maxLength: 500,
                    })}
                  />
                  
                ) : (
      
                <div>{userInfo?.address}</div>
                )}
                <br />

                {isEdit ? (
                  <input
                    className="input input-bordered w-full mt-1"
                    defaultValue={userInfo?.city}
                    {...register("city", { maxLength: 500 })}
                  />
                ) : (
                  <span className="badge badge-ghost badge-sm">
                    {userInfo?.city}
                  </span>
                )}
              </div>
            </div>
            {/* <!-- row 2 --> */}
            <div className="w-full flex flex-row">
              <div className=" px-5 lg:px-10 w-1/6 lg:w-2/12 py-5">
                <div className="font-bold">Phone</div>
              </div>
              <div className=" px-10 py-5 w-5/6 lg:w-10/12">
                {isEdit ? (
                  <input
                    type="tel"
                    className="input input-bordered input-secondary w-full"
                    defaultValue={userInfo?.phone}
                    {...register("phone", { maxLength: 15 })}
                  />
                ) : (
                  <div>{userInfo?.phone}</div>
                
                )}
              </div>
            </div>
            {/* <!-- row 2 --> */}
            <div className="w-full flex flex-row">
              <div className=" px-5 lg:px-10 w-1/6 lg:w-2/12 py-5">
                <div className="font-bold">Facebook</div>
              </div>
              <div className=" px-10 py-5 w-5/6 lg:w-10/12">
                {isEdit ? (
                  <input
                    type="text"
                    className="input input-bordered input-secondary w-full"
                    defaultValue={userInfo?.facebook}
                    {...register("facebook", { maxLength: 250 })}
                  />
                ) : (
                  <a
                    href={userInfo?.facebook}
                    target="_blank"
                    className=" text-primary hover:underline"
                  >
                    {userInfo?.facebook}
                  </a>
                )}
              </div>
            </div>
            {/* <!-- row 2 --> */}
            <div className="w-full flex flex-row">
              <div className=" px-5 lg:px-10 w-1/6 lg:w-2/12 py-5">
                <div className="font-bold">GitHub</div>
              </div>
              <div className=" px-10 py-5 w-5/6 lg:w-10/12">
                {isEdit ? (
                  <input
                    type="text"
                    className="input input-bordered input-secondary w-full"
                    defaultValue={userInfo?.github}
                    {...register("github", { maxLength: 250 })}
                  />
                ) : (
                  <a
                    href={userInfo?.github}
                    className=" text-primary hover:underline"
                    target="_blank"
                  >
                    {userInfo?.github}
                  </a>
                )}
              </div>
            </div>
            {/* <!-- row 2 --> */}
            <div className="w-full flex flex-row">
              <div className=" px-5 lg:px-10 w-1/6 lg:w-2/12 py-5">
                <div className="font-bold">Linkedin</div>
              </div>
              <div className=" px-10 py-5 w-5/6 lg:w-10/12">
                {isEdit ? (
                  <input
                    type="text"
                    className="input input-bordered input-secondary w-full"
                    defaultValue={userInfo?.linkedin}
                    {...register("linkedin", { maxLength: 250 })}
                  />
                ) : (
                  <a
                    href={userInfo?.linkedin}
                    target="_blank"
                    className=" text-primary hover:underline"
                  >
                    {userInfo?.linkedin}
                  </a>
                )}
              </div>
            </div>
            {/* <!-- row 2 --> */}
            <div className="w-full flex flex-row">
              <div className=" px-5 lg:px-10 w-1/6 lg:w-2/12 py-5">
                <div className="font-bold">Twitter</div>
              </div>
              <div className=" px-10 py-5 w-5/6 lg:w-10/12">
                {isEdit ? (
                  <input
                    type="text"
                    className="input input-bordered input-secondary w-full"
                    defaultValue={userInfo?.twitter}
                    {...register("twitter", { maxLength: 250 })}
                  />
                ) : (
                  <a
                    href={userInfo?.twitter}
                    target="_blank"
                    className=" text-primary hover:underline"
                  >
                    {userInfo?.twitter}
                  </a>
                )}
              </div>
            </div>
            {/* <!-- row 2 --> */}
            <div className=" flex flex-row justify-evenly items-center px-5 lg:px-10 py-5">
              <button
                className="btn btn-primary"
                disabled={isEdit}
                onClick={handleEdit}
              >
                Edit
              </button>
              <input
                type="submit"
                className="btn btn-secondary"
                disabled={!isEdit}
              />
            </div>
          </div>
        </div>
      </form>
    );
};

export default ViewProfile;