import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputBase,
  InputLabel,
  TextField,
} from "@mui/material";

import "./Updatepassword.css";
import Copyright from "../Common/Copyright/Copyright";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../apiServices/axiosInstance";
import { toast } from "react-toastify";
import Decrypt from "../../customHook/customHook/EncryptDecrypt/Decrypt";
import Encrypt from "../../customHook/customHook/EncryptDecrypt/Encrypt";

const Updatepassword = () => {
  const token = useLocation().hash.split("#")[1];
  const email = useLocation().hash.split("#")[2];
  const role = useLocation().hash.split("#")[3];

  const navigate = useNavigate();

  // ======  ======

  const [updatePassword, setUpdatePassword] = useState({
    password: "",
    password_confirmation: "",
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdatePassword({
      ...updatePassword,
      [name]: value,
    });
  };

  // useEffect(() => {
  //     document.title = "Update password"
  // }, [])

  const handelUpdatePassword = async () => {
    if (role == "emp") {
      const response = Encrypt(
        JSON.stringify({
          email: email,
          token: token,
          password: updatePassword.password,
          password_confirmation: updatePassword.password_confirmation,
        })
      );
      console.log("::>", response);

      const formData = new FormData();
      formData.append("response", response);

      await axiosInstance
        .post("v1/emp/new/password/update", formData)
        .then((res) => {
          const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

          if (res?.data?.success) {
            toast.success(msg);
            navigate("/login/emp");
          } else {
            toast.error(msg);
          }
        })
        .catch((err) => {
          console.log("err --->", err);
        });
    } else if (role == "guest") {
      const response = Encrypt(
        JSON.stringify({
          email: email,
          token: token,
          password: updatePassword.password,
          password_confirmation: updatePassword.password_confirmation,
        })
      );

      const formData = new FormData();
      formData.append("response", response);

      await axiosInstance
        .post("v1/guest/new/password/update", formData)
        .then((res) => {
          const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

          if (res?.data?.success) {
            toast.success(msg);
            navigate("/login/guest");
          } else {
            toast.error(msg);
          }
        })
        .catch((err) => {
          console.log("err --->", err);
        });
    }
  };

  return (
    <>
      <section className="update-pwd">
        <div className="container">
          <div className="bg-white mt-20 ">
            <div className="inside-box">
              <form action="">
                <FormControl variant="standard" className="mt-20">
                  <InputLabel shrink htmlFor="oldpwd">
                    Password:
                  </InputLabel>

                  <TextField
                    id="oldpwd"
                    name="password"
                    type="password"
                    value={updatePassword.password}
                    onChange={onChange}
                    className="model-text-field-box"
                  ></TextField>
                </FormControl>

                <FormControl variant="standard" className="mt-20">
                  <InputLabel shrink htmlFor="updatepwd">
                    Confirm password:
                  </InputLabel>

                  <TextField
                    id="updatepwd"
                    name="password_confirmation"
                    value={updatePassword.password_confirmation}
                    type="password"
                    onChange={onChange}
                    onKeyPress={(event) => {
                      var key = event.keyCode || event.which;
                      if (key === 13) {
                        handelUpdatePassword();
                      }
                    }}
                    className="model-text-field-box"
                  ></TextField>
                </FormControl>

                <Box className="mt-50 text-center bg-transparent shadow-none">
                  <Button
                    variant="solid"
                    className="common-btn ms-2"
                    onClick={handelUpdatePassword}
                  >
                    {" "}
                    Update password{" "}
                  </Button>
                </Box>
              </form>
            </div>
          </div>
        </div>

        <div className="fixed-footer">
          <Copyright />
        </div>
      </section>
    </>
  );
};

export default Updatepassword;
