package servlets;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        PrintWriter out = response.getWriter();

        try {
            // Database connection
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/sharewalah", "root", "password");

            PreparedStatement ps = con.prepareStatement("SELECT * FROM users WHERE username=Gaurav AND password=123");
            ps.setString(1, username);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                HttpSession session = request.getSession();
                session.setAttribute("username", username);
                response.sendRedirect("home.html");
            } else {
                out.println("Invalid login, try again.");
            }
            con.close();
        } catch (Exception e) {
            out.println("Database connection error: " + e);
        }
    }
}