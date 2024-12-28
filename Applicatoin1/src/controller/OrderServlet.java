package controller;

import db.DBConnection;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet(urlPatterns = "/order")

public class OrderServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        PrintWriter printWriter = resp.getWriter();
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
                Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234");
                ResultSet resultSet = connection.prepareStatement("select max(order_id) as max_order_id from orders").executeQuery();
               if (resultSet.next()) {
                   String maxOrderId = resultSet.getString("max_order_id");
                   System.out.println(maxOrderId);
                   printWriter.write(maxOrderId);

               }
            } catch (Exception e) {
                e.printStackTrace();
            }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("me thinne order ekata data ena tika");
        String oid = req.getParameter("oid");
        String cid = req.getParameter("cid");
        System.out.println(cid);
        String iid = req.getParameter("iid");
        System.out.println(iid);
        String tot = req.getParameter("total");
        System.out.println(tot);

        try{
            Connection connection = DBConnection.getInstance().getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement("insert into orders(order_id,customer_id, total_amount) values(?, ?,?)");
            preparedStatement.setInt(1, Integer.parseInt(oid));
            preparedStatement.setString(2, cid);
            preparedStatement.setString(3, tot);
            preparedStatement.executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
