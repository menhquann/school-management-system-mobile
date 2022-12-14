import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [schoolYearContext, setSchoolYearContext] = useState();
    const [clazzContext, setClazzContext] = useState();
    const [semesterContext, setSemesterContext] = useState();
    const [typeScoreContext, setTypeScoreContext] = useState();

    return (
        <AuthContext.Provider value={{ auth, setAuth, schoolYearContext, setSchoolYearContext, clazzContext, setClazzContext, semesterContext, setSemesterContext, typeScoreContext, setTypeScoreContext }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;