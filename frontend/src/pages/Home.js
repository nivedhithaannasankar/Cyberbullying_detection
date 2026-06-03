export default function Home() {
  return (
    <div className="card">
      <h1>Cyberbullying Detection System</h1>
      <p>
        AI-powered system to detect harmful messages and promote safe online communication.
      </p>
      <ul>
        <li>Real-time analysis</li>
        <li>Machine Learning prediction</li>
        <li>Safe digital environment</li>
      </ul>
        <h3 style={{ marginTop: "30px" }}>
        Cyberbullying Categories
      </h3>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "15px",
            borderRadius: "10px",
            overflow: "hidden"
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#2563eb",
                color: "white"
              }}
            >
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Targets</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={styles.td}>
            
                  Gender Cyberbullying
             
              </td>
              <td style={styles.td}>
                Male, Female, Transgender, etc.
              </td>
            </tr>

            <tr>
              <td style={styles.td}>
            
                  Religious Cyberbullying
               
              </td>
              <td style={styles.td}>
                Hindu, Muslim, Christian, Sikh, etc.
              </td>
            </tr>

            <tr>
              <td style={styles.td}>
            
                  Age-based Cyberbullying
             
              </td>
              <td style={styles.td}>
                Young, Old, Teenagers, Elderly
              </td>
            </tr>

            <tr>
              <td style={styles.td}>
            
                  Ethnicity Cyberbullying
            
              </td>
              <td style={styles.td}>
                Cultural, racial, tribal, linguistic, or ancestral groups
              </td>
            </tr>

            <tr>
              <td style={styles.td}>
         
                  General Cyberbullying
          
              </td>
              <td style={styles.td}>
                Generic insults not tied to a specific group
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  th: {
    padding: "15px",
    textAlign: "left"
  },

  td: {
    padding: "15px",
    borderBottom: "1px solid #ddd"
  },

};
