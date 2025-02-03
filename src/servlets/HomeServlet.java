package servlets;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class FeedbackServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String feedback = request.getParameter("feedback");
        PrintWriter out = response.getWriter();

        try {
            // Database connection
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/sharewalah", "root", "password");

            PreparedStatement ps = con.prepareStatement("INSERT INTO feedback (username, message) VALUES (?, ?)");
            ps.setString(1, username);
            ps.setString(2, feedback);
            ps.executeUpdate();

            out.println("Feedback submitted successfully.");
            con.close();
        } catch (Exception e) {
            out.println("Database connection error: " + e);
        }
    }
}