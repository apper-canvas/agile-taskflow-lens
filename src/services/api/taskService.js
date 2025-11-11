import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

const TABLE_NAME = "tasks_c";

export const getAll = async () => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      throw new Error("ApperClient not initialized");
    }

    const params = {
      fields: [
        {"field": {"Name": "Id"}},
        {"field": {"Name": "Name"}},
        {"field": {"Name": "title_c"}},
        {"field": {"Name": "description_c"}},
        {"field": {"Name": "priority_c"}},
        {"field": {"Name": "dueDate_c"}},
        {"field": {"Name": "completed_c"}},
        {"field": {"Name": "completedAt_c"}},
        {"field": {"Name": "listId_c"}},
        {"field": {"Name": "CreatedOn"}}
      ],
      orderBy: [{
        "fieldName": "CreatedOn",
        "sorttype": "DESC"
      }]
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return [];
    }

    if (!response.data || response.data.length === 0) {
      return [];
    }

    // Transform data to match component expectations
    return response.data.map(task => ({
      Id: task.Id,
      title: task.title_c || task.Name || "",
      description: task.description_c || "",
      priority: task.priority_c || "medium",
      dueDate: task.dueDate_c,
      completed: task.completed_c || false,
      completedAt: task.completedAt_c,
      listId: task.listId_c,
      createdAt: task.CreatedOn
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error?.response?.data?.message || error.message);
    return [];
  }
};

export const getById = async (id) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      throw new Error("ApperClient not initialized");
    }

    const params = {
      fields: [
        {"field": {"Name": "Id"}},
        {"field": {"Name": "Name"}},
        {"field": {"Name": "title_c"}},
        {"field": {"Name": "description_c"}},
        {"field": {"Name": "priority_c"}},
        {"field": {"Name": "dueDate_c"}},
        {"field": {"Name": "completed_c"}},
        {"field": {"Name": "completedAt_c"}},
        {"field": {"Name": "listId_c"}},
        {"field": {"Name": "CreatedOn"}}
      ]
    };
    
    const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      throw new Error(`Task with Id ${id} not found`);
    }

    if (!response.data) {
      throw new Error(`Task with Id ${id} not found`);
    }

    // Transform data to match component expectations
    const task = response.data;
    return {
      Id: task.Id,
      title: task.title_c || task.Name || "",
      description: task.description_c || "",
      priority: task.priority_c || "medium",
      dueDate: task.dueDate_c,
      completed: task.completed_c || false,
      completedAt: task.completedAt_c,
      listId: task.listId_c,
      createdAt: task.CreatedOn
    };
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error.message);
    throw error;
  }
};

export const create = async (taskData) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      throw new Error("ApperClient not initialized");
    }

    const params = {
      records: [{
        Name: taskData.title,
        title_c: taskData.title,
        description_c: taskData.description || "",
        priority_c: taskData.priority || "medium",
        dueDate_c: taskData.dueDate,
        completed_c: false,
        completedAt_c: null
      }]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      throw new Error("Failed to create task");
    }

    if (response.results) {
      const successful = response.results.filter(r => r.success);
      const failed = response.results.filter(r => !r.success);
      
      if (failed.length > 0) {
        console.error(`Failed to create ${failed.length} tasks:`, failed);
        failed.forEach(record => {
          record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
          if (record.message) toast.error(record.message);
        });
      }

      if (successful.length > 0) {
        const task = successful[0].data;
        return {
          Id: task.Id,
          title: task.title_c || task.Name || "",
          description: task.description_c || "",
          priority: task.priority_c || "medium",
          dueDate: task.dueDate_c,
          completed: task.completed_c || false,
          completedAt: task.completedAt_c,
          listId: task.listId_c,
          createdAt: task.CreatedOn
        };
      }
    }

    throw new Error("Failed to create task");
  } catch (error) {
    console.error("Error creating task:", error?.response?.data?.message || error.message);
    throw error;
  }
};

export const update = async (id, updateData) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      throw new Error("ApperClient not initialized");
    }

    // Prepare update payload with only updateable fields
    const updatePayload = {
      Id: parseInt(id)
    };

    if (updateData.title !== undefined) {
      updatePayload.Name = updateData.title;
      updatePayload.title_c = updateData.title;
    }
    if (updateData.description !== undefined) {
      updatePayload.description_c = updateData.description;
    }
    if (updateData.priority !== undefined) {
      updatePayload.priority_c = updateData.priority;
    }
    if (updateData.dueDate !== undefined) {
      updatePayload.dueDate_c = updateData.dueDate;
    }
    if (updateData.completed !== undefined) {
      updatePayload.completed_c = updateData.completed;
    }
    if (updateData.completedAt !== undefined) {
      updatePayload.completedAt_c = updateData.completedAt;
    }
    if (updateData.listId !== undefined) {
      updatePayload.listId_c = updateData.listId;
    }

    const params = {
      records: [updatePayload]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      throw new Error(`Failed to update task ${id}`);
    }

    if (response.results) {
      const successful = response.results.filter(r => r.success);
      const failed = response.results.filter(r => !r.success);
      
      if (failed.length > 0) {
        console.error(`Failed to update ${failed.length} tasks:`, failed);
        failed.forEach(record => {
          record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
          if (record.message) toast.error(record.message);
        });
      }

      if (successful.length > 0) {
        const task = successful[0].data;
        return {
          Id: task.Id,
          title: task.title_c || task.Name || "",
          description: task.description_c || "",
          priority: task.priority_c || "medium",
          dueDate: task.dueDate_c,
          completed: task.completed_c || false,
          completedAt: task.completedAt_c,
          listId: task.listId_c,
          createdAt: task.CreatedOn
        };
      }
    }

    throw new Error(`Failed to update task ${id}`);
  } catch (error) {
    console.error("Error updating task:", error?.response?.data?.message || error.message);
    throw error;
  }
};

export const delete_ = async (id) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      throw new Error("ApperClient not initialized");
    }

    const params = { 
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return false;
    }

    if (response.results) {
      const successful = response.results.filter(r => r.success);
      const failed = response.results.filter(r => !r.success);
      
      if (failed.length > 0) {
        console.error(`Failed to delete ${failed.length} tasks:`, failed);
        failed.forEach(record => {
          if (record.message) toast.error(record.message);
        });
      }
      return successful.length > 0;
    }

    return true;
  } catch (error) {
    console.error("Error deleting task:", error?.response?.data?.message || error.message);
    return false;
  }
};

// Export delete_ as the main delete function (delete is a reserved keyword)
export { delete_ as delete };