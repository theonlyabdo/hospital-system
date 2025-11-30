import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/nurse',"routes/nurse.tsx"),
    route('/pas',"routes/pas.tsx"),
   // route('/pas/new',"components/nurse/Dashboard.tsx"),
    route('/doctor',"routes/doctor.tsx"),
    route('/pharmacy',"routes/pharmacy.tsx"),
    route('/laboratory',"routes/laboratory.tsx"),

] satisfies RouteConfig;
