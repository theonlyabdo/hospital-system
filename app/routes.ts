import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/nurse',"routes/nurse.tsx"),
    route('/registration',"routes/registration.tsx"),
    route('/doctor',"routes/doctor.tsx"),
    route('/pharmacy',"routes/pharmacy.tsx"),
    route('/laboratory',"routes/laboratory.tsx"),

] satisfies RouteConfig;
