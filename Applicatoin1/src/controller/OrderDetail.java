package controller;

import db.DBConnection;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.json.Json;
import javax.json.JsonObject;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/orderdetails")

public class OrderDetail extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("me thinne order detail ekata data ena tika");
        String oid = req.getParameter("oid");
        System.out.println(oid);
        String iid = req.getParameter("iid");
        System.out.println(iid);

        try{
            Connection connection = DBConnection.getInstance().getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement("insert into order_details(order_id, item_id) values(?, ?)");
            preparedStatement.setString(1, oid);
            preparedStatement.setString(2, iid);
            preparedStatement.executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonObject jsonObject = Json.createReader(req.getReader()).readObject();
        System.out.println("update wenna ona set eka");
        String iid = jsonObject.getString("iid");
        System.out.println(iid);
        String qty = jsonObject.getString("qty");
        System.out.println(qty);

        try {
            Connection connection = DBConnection.getInstance().getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement("UPDATE items SET qty_on_hand = qty_on_hand - ? WHERE item_id = ?");
            preparedStatement.setString(1, qty);
            preparedStatement.setString(2, iid);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
