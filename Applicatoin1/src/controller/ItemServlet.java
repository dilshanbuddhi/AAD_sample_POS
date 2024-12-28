package controller;

import db.DBConnection;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet(urlPatterns = "/item")
public class ItemServlet extends HttpServlet {
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        try {
            Connection connection = DBConnection.getInstance().getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement("delete from items where item_id = ?");
            preparedStatement.setString(1, id);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonObject jsonObject = Json.createReader(req.getReader()).readObject();
        String id = jsonObject.getString("id");
        String name = jsonObject.getString("name");
        String price = jsonObject.getString("price");
        String qty = jsonObject.getString("qty");
        String des = jsonObject.getString("des");

        try {
            Connection connection = DBConnection.getInstance().getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement("UPDATE items SET item_name = ?, unit_price = ?, qty_on_hand = ?, description = ? WHERE item_id = ?");
            preparedStatement.setString(1, name);
            preparedStatement.setString(2, price);
            preparedStatement.setString(3, qty);
            preparedStatement.setString(4, des);
            preparedStatement.setString(5, id);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("customer");
        resp.setContentType("application/json");
        JsonArrayBuilder jsonArray = Json.createArrayBuilder();

        PrintWriter printWriter = resp.getWriter();

        try {

          /*  Connection connection = DBConnection.getInstance().getConnection();
            ResultSet resultSet = connection.prepareStatement("select * from items").executeQuery();
            */
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234");
            ResultSet resultSet = connection.prepareStatement("select * from items").executeQuery();
            System.out.println("jjj");


            while (resultSet.next()) {
                String id = resultSet.getString(1);
                String name = resultSet.getString(2);
                String price = resultSet.getString(3);
                String qty = resultSet.getString(4);
                String des = resultSet.getString(5);

                JsonObjectBuilder customer = Json.createObjectBuilder();
                customer.add("id", id);
                customer.add("name", name);
                customer.add("price", price);
                customer.add("qty", qty);
                customer.add("des", des);

                jsonArray.add(customer);
            }

            printWriter.write(jsonArray.build().toString());

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String name = req.getParameter("name");
        String price = req.getParameter("price");
        String qty = req.getParameter("qty");
        String des = req.getParameter("des");

        System.out.println(name + " " + price + " " + qty + " " + des);

        try {
            Connection connection = DBConnection.getInstance().getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement("insert into items(item_name, unit_price, qty_on_hand, description) values(?, ?, ?, ?)");
            preparedStatement.setString(1, name);
            preparedStatement.setString(2, price);
            preparedStatement.setString(3, qty);
            preparedStatement.setString(4, des);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);

        }
    }
}
